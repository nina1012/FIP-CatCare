

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."cat_sex" AS ENUM (
    'male',
    'female',
    'neutered male',
    'spayed female'
);


ALTER TYPE "public"."cat_sex" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_daily_log"("cat_id" "uuid", "new_log" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    existing_log_count int;
BEGIN
    -- Check if a log already exists for the given cat and date
    SELECT COUNT(*)
    INTO existing_log_count
    FROM daily_logs
    WHERE cat_id = cat_id
    AND date_trunc('day', log_date) = date_trunc('day', current_date);

    -- If a log already exists, raise an exception
    IF existing_log_count > 0 THEN
        RAISE EXCEPTION 'A daily log already exists for today.';
    END IF;

    -- Insert the new daily log if no log exists for today
    INSERT INTO daily_logs (cat_id, day, dose, weight, medication_name, log_date)
    VALUES (
        new_log->>'cat_id',
        new_log->>'day',
        new_log->>'dose',
        new_log->>'weight',
        new_log->>'medication_name',
        new_log->>'log_date'
    );
END;
$$;


ALTER FUNCTION "public"."create_daily_log"("cat_id" "uuid", "new_log" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."register_new_cat"("_user_id" "uuid", "_name" character varying, "_breed" character varying, "_age" integer, "_weight" integer, "_color" character varying, "_cat_image_url" "text", "_sex" "public"."cat_sex" DEFAULT NULL::"public"."cat_sex") RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    new_cat_id UUID;
BEGIN
    INSERT INTO public.cats (cat_id, user_id, name, breed, age, weight, color, cat_image_url, sex, created_at)
    VALUES (gen_random_uuid(), _user_id, _name, _breed, _age, _weight, _color, _cat_image_url, _sex, current_timestamp)
    RETURNING cat_id INTO new_cat_id;

    RETURN new_cat_id;
END;
$$;


ALTER FUNCTION "public"."register_new_cat"("_user_id" "uuid", "_name" character varying, "_breed" character varying, "_age" integer, "_weight" integer, "_color" character varying, "_cat_image_url" "text", "_sex" "public"."cat_sex") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."renumber_days"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
    -- After deleting a row, renumber the remaining days for the same cat
    UPDATE public.daily_logs
    SET day = subquery.new_day
    FROM (
        SELECT log_id, ROW_NUMBER() OVER (ORDER BY log_date) - 1 AS new_day
        FROM public.daily_logs
        WHERE cat_id = OLD.cat_id
        ORDER BY log_date
    ) AS subquery
    WHERE public.daily_logs.log_id = subquery.log_id;
    
    RETURN NULL; -- Since it's an AFTER DELETE trigger, return NULL.
END;$$;


ALTER FUNCTION "public"."renumber_days"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."cats" (
    "cat_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "breed" character varying(100),
    "age" integer,
    "color" character varying(50),
    "weight" numeric(5,2) NOT NULL,
    "sex" "public"."cat_sex",
    "cat_image_url" "text",
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."cats" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."daily_logs" (
    "log_id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "cat_id" "uuid",
    "log_date" timestamp without time zone NOT NULL,
    "weight" numeric(5,2),
    "medication_name" character varying(255),
    "dose" character varying(255),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "note" "text",
    "day" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."daily_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "full_name" "text" NOT NULL,
    "avatar_url" "text" DEFAULT 'https://hhlssisemnabnytofbci.supabase.co/storage/v1/object/public/user_images/avatar-placeholder.png'::"text",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "email" "text" NOT NULL,
    "user_id" "uuid" NOT NULL
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."cats"
    ADD CONSTRAINT "cats_pkey" PRIMARY KEY ("cat_id");



ALTER TABLE ONLY "public"."daily_logs"
    ADD CONSTRAINT "daily_logs_pkey" PRIMARY KEY ("log_id");



ALTER TABLE ONLY "public"."daily_logs"
    ADD CONSTRAINT "unique_log_per_day" UNIQUE ("cat_id", "log_date");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_username_key" UNIQUE ("full_name");



CREATE OR REPLACE TRIGGER "trigger_renumber_days" AFTER DELETE ON "public"."daily_logs" FOR EACH ROW EXECUTE FUNCTION "public"."renumber_days"();



ALTER TABLE ONLY "public"."cats"
    ADD CONSTRAINT "cats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."daily_logs"
    ADD CONSTRAINT "daily_logs_cat_id_fkey" FOREIGN KEY ("cat_id") REFERENCES "public"."cats"("cat_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



CREATE POLICY "Allow admin full access" ON "public"."users" USING (("auth"."role"() = 'admin'::"text")) WITH CHECK (("auth"."role"() = 'admin'::"text"));



CREATE POLICY "Allow delete for own logs" ON "public"."daily_logs" FOR DELETE USING ((("auth"."role"() = 'authenticated'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."cats"
  WHERE (("cats"."cat_id" = "daily_logs"."cat_id") AND ("cats"."user_id" = "auth"."uid"()))))));



CREATE POLICY "Allow insert for own cat" ON "public"."daily_logs" FOR INSERT WITH CHECK ((("auth"."role"() = 'authenticated'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."cats"
  WHERE (("cats"."cat_id" = "daily_logs"."cat_id") AND ("cats"."user_id" = "auth"."uid"()))))));



CREATE POLICY "Allow read-only access for viewers" ON "public"."users" FOR SELECT USING (("auth"."role"() = 'viewer'::"text"));



CREATE POLICY "Allow select for own logs" ON "public"."daily_logs" FOR SELECT USING ((("auth"."role"() = 'authenticated'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."cats"
  WHERE (("cats"."cat_id" = "daily_logs"."cat_id") AND ("cats"."user_id" = "auth"."uid"()))))));



CREATE POLICY "Allow update for own logs" ON "public"."daily_logs" FOR UPDATE USING ((("auth"."role"() = 'authenticated'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."cats"
  WHERE (("cats"."cat_id" = "daily_logs"."cat_id") AND ("cats"."user_id" = "auth"."uid"()))))));



CREATE POLICY "Allow user to delete their own cats" ON "public"."cats" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Allow user to delete their own data" ON "public"."users" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Allow user to insert their own cats" ON "public"."cats" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Allow user to insert their own data" ON "public"."users" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Allow user to update their own cats" ON "public"."cats" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Allow user to update their own data" ON "public"."users" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Allow user to view their own cats" ON "public"."cats" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Allow user to view their own data" ON "public"."users" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."cats" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."daily_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
































































































































































































GRANT ALL ON FUNCTION "public"."create_daily_log"("cat_id" "uuid", "new_log" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."create_daily_log"("cat_id" "uuid", "new_log" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_daily_log"("cat_id" "uuid", "new_log" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."register_new_cat"("_user_id" "uuid", "_name" character varying, "_breed" character varying, "_age" integer, "_weight" integer, "_color" character varying, "_cat_image_url" "text", "_sex" "public"."cat_sex") TO "anon";
GRANT ALL ON FUNCTION "public"."register_new_cat"("_user_id" "uuid", "_name" character varying, "_breed" character varying, "_age" integer, "_weight" integer, "_color" character varying, "_cat_image_url" "text", "_sex" "public"."cat_sex") TO "authenticated";
GRANT ALL ON FUNCTION "public"."register_new_cat"("_user_id" "uuid", "_name" character varying, "_breed" character varying, "_age" integer, "_weight" integer, "_color" character varying, "_cat_image_url" "text", "_sex" "public"."cat_sex") TO "service_role";



GRANT ALL ON FUNCTION "public"."renumber_days"() TO "anon";
GRANT ALL ON FUNCTION "public"."renumber_days"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."renumber_days"() TO "service_role";





















GRANT ALL ON TABLE "public"."cats" TO "anon";
GRANT ALL ON TABLE "public"."cats" TO "authenticated";
GRANT ALL ON TABLE "public"."cats" TO "service_role";



GRANT ALL ON TABLE "public"."daily_logs" TO "anon";
GRANT ALL ON TABLE "public"."daily_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."daily_logs" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
