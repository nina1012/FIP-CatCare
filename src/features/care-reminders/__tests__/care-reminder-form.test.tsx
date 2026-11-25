import { describe, expect, it, vi } from 'vitest';

import { Dialog, DialogContent } from '@/components/ui/dialog/dialog';
import { appRender, screen } from '@/testing/test-utils';

import { CareReminderForm } from '../components/care-reminder-form';
import { todayKey } from '../utils/dates';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    rpc: vi.fn(),
    auth: { getUser: vi.fn() },
  },
}));

const renderForm = () =>
  appRender(
    <Dialog open>
      <DialogContent>
        <CareReminderForm catID="cat-1" />
      </DialogContent>
    </Dialog>,
  );

describe('CareReminderForm', () => {
  it('stops the date picker on today', () => {
    renderForm();

    expect(screen.getByLabelText('Due date')).toHaveAttribute(
      'min',
      todayKey(),
    );
  });
});
