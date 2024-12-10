"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  updatePassword, 
  clearAllUpdateProfileErrors 
} from "@/store/slices/update-profile.slice";
import { RootState } from "@/store/store";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const UpdatePasswordPage = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  
  const { loading, error, isUpdated } = useSelector((state: RootState) => state.updateProfile);

  // Form state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password validation states
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Clear any previous update errors
    dispatch(clearAllUpdateProfileErrors());
  }, [dispatch]);

  useEffect(() => {
    if (isUpdated) {
      router.back();
      toast({
        title: "Success",
        variant: "success",
        description: "Password Updated Successfully"
      });
    }
  }, [isUpdated]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error
      });
    }
  }, [error]);

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) return;

    dispatch(updatePassword({
      oldPassword,
      newPassword,
      confirmPassword
    }));
  };

  return (
    <div className="w-4xl mx-auto py-10">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.back()}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-4xl text-primary flex-grow text-center">
            Update Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input 
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>New Password</Label>
              <Input 
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
              {passwordError && (
                <p className="text-destructive text-sm mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={loading}
                className="mt-4 w-full"
                variant="primary"
              >
                {loading ? "Updating..." : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePasswordPage;