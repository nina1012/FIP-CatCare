import { beforeEach, describe, expect, it, vi } from 'vitest';

import { appRender, screen, userEvent } from '@/testing/test-utils';

import { Reminder } from '../reminder';

// Mock the utility functions
vi.mock('../utils/check-reminder');
vi.mock('../utils/notify-set-reminder');

describe('Reminder', () => {
  const defaultReminderTime = '08:00';
  beforeEach(() => {
    // Mock Notification
    global.Notification = {
      permission: 'default',
      requestPermission: vi.fn().mockResolvedValue('granted'), //resolve as 'granted'
    } as unknown as typeof Notification;
  });
  const notifySetReminder = vi.fn().mockReturnValue(defaultReminderTime);
  it('renders reminder component', async () => {
    appRender(<Reminder />);
    expect(
      screen.getByLabelText(/Set Daily Reminder Time/i),
    ).toBeInTheDocument();
  });

  it('sets reminder time to reminderTime', async () => {
    appRender(<Reminder />);
    const reminderTimeInput = screen.getByTestId('reminder-time');
    const turnOnButton = screen.getByRole('button', { name: /turn on/i });

    await userEvent.type(reminderTimeInput, defaultReminderTime, {
      initialSelectionStart: 0,
      initialSelectionEnd: reminderTimeInput.nodeValue?.length,
    });
    await userEvent.click(turnOnButton);
    expect(notifySetReminder()).eq(defaultReminderTime);
    // show the toast when set the reminder time
    expect(screen.getByLabelText('Notifications (F8)')).toBeInTheDocument();
  });
});
