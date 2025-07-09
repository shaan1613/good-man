'use client';

import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <SignUp />
    </div>
  )
}

export default SignUpPage