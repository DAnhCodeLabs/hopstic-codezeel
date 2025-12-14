import ButtonCommon from '@/components/common/ButtonCommon';
import InputCommon from '@/components/common/InputCommon';
import React from 'react';

const NewsletterSubscription = () => {
  return (
    <div className="w-full p-10 bg-primary mt-14">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-start justify-center w-full gap-6 text-white">
            <p className='text-2xl font-bold'>Sign Up & Subscribe To Our Newsletter</p>
            <p>
              Subscribe to our latest newsletter to get news about special discounts & upcoming
              sales
            </p>
            <div className="flex items-center justify-center w-full gap-4">
              <InputCommon placeholder="Email ..." className="w-full flex-1 flex" size="large"/>
              <ButtonCommon size="large" className='bg-white! text-text-strong!'>Search</ButtonCommon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
