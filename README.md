---
---

# FIP CatCare App 🐈 💉💊

The only app you need to monitor, manage, and analyze your cat's FIP treatment progress, helping you stay informed and proactive every step of the way

## Table of Contents

- [Project Description](#project-description)
- [Getting started](#getting-started)
- [Installation and Setup](#installation-and-setup)

## Project Description 📖

**FIP CatCare app** is a web app for tracking and managing medication schedules, daily health logs, and test results for cats undergoing treatment for FIP. For owners of FIP positive cats, in hope for fast recovery 🍀
This app helps users manage their cats' schedules, add notes and set reminders and upload test results (bloodwork, etc.).

### Brief Introduction and Explanation of FIP 🦠

#### What is FIP?

Feline Infectious Peritonitis (FIP) is a serious viral disease that affects cats, caused by certain strains of the feline coronavirus. While many cats infected with feline coronavirus remain healthy, a small percentage of cats develop FIP, which can be fatal if left untreated.

#### How Can FIP Be Treated?

FIP used to be considered untreatable, but recent advances have made treatment possible using specific antiviral medications. The treatment often involves precise dosing based on the cat’s weight, the type of FIP (wet, dry, ocular, or neurological), and the medication’s concentration.

## Getting Started 💻

#### Important Notice ⚠️

**Please Note**: Some actions and features in this project are **not functional in production** because they rely on specific data or configurations that have yet to be pushed to the production database.

You have two options to get started with the **FIP CatCare App**:

1. **Use the Test Account**:

   - If you want to quickly explore the app's functionality, you can use the test account provided below:
     - **Email**: test@user.com
     - **Password**: password

   **Note**: This test account is read-only and designed for preview purposes. Any data entered or modified will not be saved permanently.

2. **Follow Installation Instructions**:
   - If you’d like to set up the app on your local machine, please follow the installation instructions below:

## Installation and Setup 🛠️

1. **Clone the repository:**

   ```bash
   git clone git@github.com:nina1012/FIP-CatCare.git
   cd FIP-CatCare
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   1. **Create a `.env` file** in the root directory of your project:

      ```bash
      touch .env
      ```

   2. **Add the following variables to your `.env` file.** Replace `<YOUR_SUPABASE_URL>` and `<YOUR_SUPABASE_ANON_KEY>` with your actual Supabase credentials:

      ```bash
      VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
      VITE_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
      ```

   3. **Example of how your `.env` file should look:**

      ```bash
      VITE_SUPABASE_URL=https://your-project-id.supabase.co
      VITE_SUPABASE_ANON_KEY=your_anon_key
      ```

**Note**: Ensure that your `.env` file is not shared publicly, as it contains sensitive information. Since this app is built using Vite, remember to prefix your environment variables with `VITE_`

4. **Run the development server:**

   ```bash
   npm run dev
   ```

## Planning application structure

## App requirements 📎

- Functional requirements:

  - public facing part - landing page (that will educate cats' owners what FIP is and how to treat and cure it), also can have a gallery of already cured cats 😻 - available for anonymous and authenticated users
  - user dashboard - only authenticated users
  - add cat/cats
  - based on the type of FIP, cat's weight and concentration of the medication - calculate current dosage of the medication
  - log dosage given each day (for 84 or more days)
  - add daily notes and symptoms
  - reminder for vet control and bloodwork (vet control should happen every 4 weeks during the treatment and every 4 weeks after the treatment)
  - upload test results (in format of image)
  - view history (previous logs)
  - manage multiple cats (1 owner can have many cats)

- Non-functional requirements:
  - responsive design (mobile first)
  - reliable notifications

## User stories

- [x] As a user, I want to create an account and log in
- [x] As a user, I want to add, view, edit, and delete cats
- [x] As a user, I want to add daily logs for each cat including medication dosage and notes
- [] As a user, I want to upload and view bloodwork and test results for each cat
- [x] As a user, I want to calculate the medication dosage based on the cat's weight and symptoms

## Documentation (Case Study) 📚

- [Problem](./docs/Problem.md)
- [Solution](./docs/Solution.md)
- [Target Audience](./docs/Audience.md)
- [Technical Details](./docs/TechStack.md)

## Tables and data relationships 🖇️

![Supabase schema visualizer](./public/screenshots/FIP-CatCare-DB.png) (from supabase schema visualizer)

```

```

### Design Inspiration 🎨

This project’s design was inspired by [FIP Oasis](https://fipoasis.com) and [Cure FIP](https://www.curefip.com/), with custom tweaks to fit my app’s functionality and style.
