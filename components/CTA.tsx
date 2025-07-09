import React from "react";
import Image from "next/image";
import Link from "next/link";
const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way</div>
      <h2 className="cta-title text-3xl font-bold">
        Build and personalise learning companion
      </h2>
      <p className="cta-description text-lg">
        A name, subject, voice and personality -- and startlearning English voice
        conversation with that feel natural and fun
      </p>
      <Image src ="/images/cta.svg" alt="cta-image" width={365} height={222} />
      <button className="btn-primary">
        <Image src="/icons/plus.svg" alt="plus" width={16} height={16} />
        <Link href="/companion/new">Create Companion</Link>
      </button>
    </section>
  );
};

export default CTA;
