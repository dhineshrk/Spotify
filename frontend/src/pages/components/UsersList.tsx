import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";

const UsersListSkeletonView = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

  return (
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 p-4">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 
                  rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.clerkId === user.clerkId ? "bg-zinc-800" : "hover:bg-zinc-800/50"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="size-8 md:size-12">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0 lg:block hidden">
                    <span className="font-medium truncate flex items-center gap-2">
                      {user.fullName}
                      {onlineUsers.has(user.clerkId) && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const UsersList = () => {
  const { users, selectedUser, setSelectedUser, onlineUsers, messages } = useChatStore();

  return (
    <div className="bg-zinc-800 h-full overflow-y-auto p-4">
      <ul>
        {users.map((user) => {
          // Count new messages for the current user
          const newMessages = messages.filter(
            (message) => message.senderId === user.clerkId && message.senderId !== selectedUser?.clerkId
          );

          const newMessageCount = newMessages.length;

          return (
            <li
              key={user.clerkId}
              className={`p-2 cursor-pointer flex items-center gap-3 ${
                selectedUser?.clerkId === user.clerkId ? "bg-zinc-700" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <img
                className="w-8 h-8 rounded-full"
                src={user.imageUrl}
                alt={user.fullName}
              />
              <span className="flex-1 text-white flex items-center gap-2">
                {user.fullName}
                {onlineUsers.has(user.clerkId) && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </span>
              {newMessageCount > 0 && (
                <span className="w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center ml-2">
                  {newMessageCount}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { UsersListSkeletonView, UsersList };
export default UsersList;
