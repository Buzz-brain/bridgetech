import React from 'react';

export default function FAQs() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-6 text-primary-700">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg">How do I onboard my school?</h4>
          <p className="text-gray-700">Contact us via the form below or email, and our team will guide you through the onboarding process.</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg">Is Bridgetech secure?</h4>
          <p className="text-gray-700">Yes, we use industry-standard security and privacy practices to keep your data safe.</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg">Can I customize my school portal?</h4>
          <p className="text-gray-700">Absolutely! Each school portal can be branded and configured to your needs.</p>
        </div>
      </div>
    </div>
  );
}
