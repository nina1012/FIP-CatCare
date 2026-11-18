import { describe, expect, it, vi } from 'vitest';

import { appRender, screen } from '@/testing/test-utils';

import { CareReminderList } from '../components/care-reminder-list';
import { CareReminder } from '../types';
import { addDays, formatReminderDate, todayKey } from '../utils/dates';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    rpc: vi.fn(),
    auth: { getUser: vi.fn() },
  },
}));

const reminder = (overrides: Partial<CareReminder> = {}): CareReminder => ({
  reminder_id: 'reminder-1',
  cat_id: 'cat-1',
  user_id: 'user-1',
  kind: 'vet_visit',
  due_on: '2026-10-05',
  notes: 'County clinic',
  completed_at: null,
  last_notified_on: null,
  created_at: '2026-10-01T00:00:00.000Z',
  updated_at: '2026-10-01T00:00:00.000Z',
  cat_name: 'Miso',
  ...overrides,
});

describe('CareReminderList', () => {
  it('shows an empty state when the cat has no reminders', () => {
    appRender(<CareReminderList reminders={[]} />);

    expect(
      screen.getByText(/schedule a weigh-in, bloodwork, or vet visit/i),
    ).toBeInTheDocument();
  });

  it('groups an overdue vet visit separately from a completed weigh-in', () => {
    const overdueOn = addDays({ dateKey: todayKey(), days: -10 });

    appRender(
      <CareReminderList
        reminders={[
          reminder({ due_on: overdueOn }),
          reminder({
            reminder_id: 'done',
            kind: 'weigh_in',
            due_on: '2026-10-01',
            notes: null,
            completed_at: '2026-10-01T12:00:00.000Z',
          }),
        ]}
      />,
    );

    expect(screen.getByRole('region', { name: 'Overdue' })).toHaveTextContent(
      'Vet visit',
    );
    expect(screen.getByRole('region', { name: 'Overdue' })).toHaveTextContent(
      'County clinic',
    );
    expect(
      screen.getByRole('button', {
        name: `Mark Vet visit on ${formatReminderDate(overdueOn)} done`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /mark weigh-in/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Done (1)')).toBeInTheDocument();
  });
});
