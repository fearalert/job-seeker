"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUser } from "@/store/slices/user.slice";
import { RootState } from "@/store/store";
import { Edit, LogOut, Copy, CheckCircle } from "lucide-react";

const ProfilePage = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [copied, setCopied] = useState<{[key: string]: boolean}>({});
  const { loading, user, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied({...copied, [field]: true});
    setTimeout(() => setCopied({...copied, [field]: false}), 2000);
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto py-10">
      <Card>
        <CardHeader>
          <Skeleton className="h-10 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto py-10">
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
          <Button 
            variant="destructive" 
            className="mt-4" 
            onClick={() => dispatch(fetchUser())}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-4xl text-primary text-center">User Profile</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleEditProfile}
              className="hover:bg-blue-50"
            >
              <Edit className="h-5 w-5 text-blue-600" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Name', value: user?.name, field: 'name' },
              { label: 'Email', value: user?.email, field: 'email' },
              { label: 'Phone', value: user?.phone, field: 'phone' },
              { label: 'Address', value: user?.address, field: 'address' },
            ].map(({ label, value, field }) => (
              <div 
                key={field} 
                className="bg-gray-50 p-3 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-bold text-zinc-900">{label}:</p>
                  <p className="text-zinc-500">{value || "N/A"}</p>
                </div>
                {value && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleCopyToClipboard(value.toString(), field)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    {copied[field] ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                )}
              </div>
            ))}
            <div className="sm:col-span-2 bg-gray-50 p-3 rounded-lg">
              <p className="font-bold text-zinc-900 mb-2">Role:</p>
              <p className="capitalize text-zinc-500">{user?.role || "N/A"}</p>
            </div>
            <div className="sm:col-span-2 bg-gray-50 p-3 rounded-lg">
              <p className="font-bold text-zinc-900 mb-2">Niches:</p>
              <ul className="list-disc pl-5 space-y-1">
                {user?.niches ? (
                  Object.entries(user.niches).map(([key, value]) => (
                    <li 
                      key={key} 
                      className="text-zinc-900 hover:text-blue-600 transition-colors"
                    >
                      {key.replace("Niche", " Niche")}: {value || "N/A"}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No niches defined</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;