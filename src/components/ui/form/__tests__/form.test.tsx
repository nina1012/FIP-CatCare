import { FieldError, SubmitHandler } from 'react-hook-form';
import { expect, test, vi } from 'vitest';
import { z } from 'zod';

import { appRender, userEvent, screen, waitFor } from '@/testing/test-utils';

import { Button } from '../../common/button';
import { Form } from '../form';
import { Input } from '../input';

const testData = {
  title: 'Hello world',
};
const schema = z.object({
  title: z.string().min(1, 'Required'),
});

test('should render and submit a basic form with proper validation', async () => {
  const handleSubmit = vi.fn() as SubmitHandler<z.infer<typeof schema>>;
  appRender(
    <Form onSubmit={handleSubmit} schema={schema}>
      {({ register, formState }) => (
        <>
          <Input
            label="title"
            registration={register('title')}
            error={formState.errors['title'] as FieldError}
          />
          <Button name="submit" type="submit">
            submit
          </Button>
        </>
      )}
    </Form>,
  );

  await userEvent.type(screen.getByLabelText(/title/i), testData.title);
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything()),
  );
});

test('should fail submission if validation fails', async () => {
  const handleSubmit = vi.fn() as SubmitHandler<z.infer<typeof schema>>;

  appRender(
    <Form onSubmit={handleSubmit} schema={schema}>
      {({ register, formState }) => (
        <>
          <Input
            label="title"
            error={formState.errors['title'] as FieldError}
            registration={register('title')}
          />
          <Button type="submit" name="submit">
            submit
          </Button>
        </>
      )}
    </Form>,
  );
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  await screen.findByRole('alert', { name: /required/i });
  expect(handleSubmit).toBeCalledTimes(0);
});
