import { getRandomUsers } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "./FollowButton";

async function WhoToFollow() {
  const users = await getRandomUsers();

  if (users.length === 0) return null;

  return (
    <Card className="bg-background shadow-sm">
      <CardHeader className="border-b p-4">
        <CardTitle className="text-lg font-semibold">Who to Follow</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
            >
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Link href={`/profile/${user.username}`}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium text-sm hover:underline"
                  >
                    {user.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>

              {/* Follow Button (Commented Out) */}
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default WhoToFollow;