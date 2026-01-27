import { Bell } from 'lucide-react';
import { getNotificationsAction } from '../actions/notification.action';
import NotificationCard from '../components/notifications/NotificationCard';
import NotificationHeaderActions from '../components/notifications/NotificationHeaderActions';

export default async function NotificationsPage() {
  const result = await getNotificationsAction();
  const notifications = result.success ? result.data : [];

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 2. 알림 리스트 영역 */}
      <main className="no-scrollbar flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5 text-green-ez" />
            <h2 className="font-semibold text-base">최근 도착한 소식</h2>
          </div>
          {notifications && notifications.length > 0 && (
            <NotificationHeaderActions />
          )}
        </div>

        <div className="flex flex-col gap-4">
          {notifications && notifications.length > 0 ? (
            notifications.map((noti) => (
              <NotificationCard key={noti.id} notification={noti} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-gray-400">도착한 알림이 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
