"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";




export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined

  if (organization.isLoaded && user.isLoaded){
      orgId = organization.organization?.id ?? user.user?.id
  }
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles, {orgId: orgId ? orgId : "skip"});

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      {files && files.length > 0 ? (
        files.map((file) => (
          <div key={file._id}>{file.name}</div>
        ))
      ) : (
        <div></div>
      )}

      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({
            name: "hello",
            orgId: orgId,
          });
        }}
      >
        Click me
      </Button>
    </main>
  );
}
