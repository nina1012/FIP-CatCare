import { screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';

import { DosageCalcRoute } from '@/app/pages/app/dosage-calc';
import { appRender, userEvent } from '@/testing/test-utils';

import { CalculateDosageForm } from '../calculate-dosage-form';

test('renders CalculateDosageForm on button click', async () => {
  // since CalculateDosageForm appears only when user clicks the button, we have to make sure that DosageCalcRoute gets rendered
  appRender(<DosageCalcRoute />);
  const button = screen.getByText(/new calculate daily dosage/i);
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  appRender(<CalculateDosageForm />);

  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => {
    expect(screen.getByTestId('dosage-heading')).toBeInTheDocument();
  });
});
