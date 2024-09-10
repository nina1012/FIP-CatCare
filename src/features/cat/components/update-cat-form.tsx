import { Plus } from 'lucide-react';
import { memo } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { Form, Input, Label } from '@/components/ui/form';
import CustomSelect from '@/components/ui/form/custom-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';
import { isFileList } from '@/utils/isFileList';

import { useUpdateCatData } from '../api/update-cat-data';
import { Cat } from '../types';

import { BreedList } from './breed-list';
import { formCatSchema } from './register-cat-form';

export type UpdateCatFormProps = {
  cat: Cat;
};

const updateCatSchema = formCatSchema.extend({
  sex: z.enum(['male', 'female', 'neutered male', 'spayed female']).optional(),
});

const UpdateCatForm = ({ cat }: UpdateCatFormProps) => {
  const { updateCat, isPendingUpdateCat } = useUpdateCatData(cat.cat_id);

  return (
    <div>
      <Form
        onSubmit={(values) => {
          let imageUrl;
          // if user didn't update info, keep the old cat_image_url
          if (values.cat_image_url && values.cat_image_url.length === 0) {
            imageUrl = cat?.cat_image_url;
          }
          updateCat({
            cat_image_url: values.cat_image_url
              ? values.cat_image_url
              : imageUrl,
            name: values.name,
            breed: values.breed,
            age: values.age,
            color: values.color,
            weight: +values.weight,
            sex: values.sex,
          });
        }}
        schema={updateCatSchema}
      >
        {({ register, formState, watch, setValue }) => {
          const selectedFile = watch('cat_image_url');
          const isFileSelected = selectedFile && selectedFile.length > 0;

          const selectedBreed = watch('breed');

          return (
            <>
              <Label
                htmlFor="cat_image_url"
                className="group relative mx-auto my-4 flex size-20 cursor-pointer flex-col items-center justify-center self-center rounded-[50%]  border-2"
              >
                <Plus className="absolute right-0 top-0 z-10 rounded-full border border-primary bg-background text-primary transition-all focus-within:text-white group-hover:bg-primary group-hover:text-white" />
                <Input
                  type="file"
                  registration={register('cat_image_url')}
                  className="hidden"
                  id="cat_image_url"
                />
                <div className="border-2">
                  <img
                    src={
                      isFileSelected && isFileList(selectedFile[0])
                        ? selectedFile[0] + ''
                        : ((cat.cat_image_url ||
                            '/public/cat-placeholder.jpg') as string)
                    }
                    alt="Preview"
                    className="absolute inset-0 z-0 size-full rounded-full object-cover object-center"
                  />
                </div>
              </Label>
              <Input
                type="text"
                placeholder="Cat's name"
                error={formState.errors['name']}
                registration={register('name')}
                defaultValue={cat.name}
              />
              <CustomSelect registration={register('breed')}>
                <SelectTrigger>
                  <SelectValue placeholder={selectedBreed || cat.breed} />
                </SelectTrigger>
                <SelectContent>
                  {/* TODO, this needs to be fixed soon */}
                  <BreedList
                    onSelect={(breed: string) => {
                      setValue('breed', breed);
                    }}
                  />
                </SelectContent>
              </CustomSelect>
              <Input
                type="string"
                placeholder="Cat's age"
                error={formState.errors['age']}
                registration={register('age')}
                defaultValue={cat.age}
                pattern="[0-9]+"
              />
              <Input
                type="text"
                placeholder="Cat's color"
                error={formState.errors['color']}
                registration={register('color')}
                defaultValue={cat.color}
              />
              <Input
                type="text"
                placeholder="Cat's weight (in kg)"
                error={formState.errors['weight']}
                registration={register('weight')}
                defaultValue={cat.weight}
                pattern="[0-9]+"
              />
              <CustomSelect registration={register('sex')}>
                <SelectTrigger>
                  <SelectValue placeholder={cat.sex} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="neutered male">Neutered Male</SelectItem>
                  <SelectItem value="spayed female">Spayed Female</SelectItem>
                </SelectContent>
              </CustomSelect>
              <Button
                type="submit"
                className="flex w-full gap-2"
                disabled={isPendingUpdateCat}
              >
                Edit {cat.name}{' '}
                <span className="inline-block">
                  {isPendingUpdateCat && <Spinner size="sm" />}
                </span>
              </Button>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default memo(UpdateCatForm);
