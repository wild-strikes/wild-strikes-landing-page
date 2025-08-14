'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/api';

export function useEmailWhitelist() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const isValidEmail = (value: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  };

  const resetAfterDelay = () => {
    setTimeout(() => {
      setEmail('');
      setError('');
      setIsSuccess(false);
      setShowButton(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      setError('Please enter a valid email address');
      setIsSuccess(false);
      return;
    }

    try {
      const result = await subscribeNewsletter(trimmedEmail);
      setError('');
      setIsSuccess(true);
      if (result?.alreadySubscribed) {
        // Optionally change message/UI for already subscribed
        // e.g., setInfo('You are already subscribed');
      }
      resetAfterDelay();
    } catch (e: any) {
      setIsSuccess(false);
      setError(e?.message || 'Subscription failed, please try again');
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (value.trim() === '') {
      setShowButton(false);
      setError('');
      return;
    }

    setShowButton(true);
    if (isValidEmail(value)) {
      setError('');
    } else {
      setError('Please enter a valid email address');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      void handleSubmit();
    }
  };

  return {
    email,
    error,
    isSuccess,
    showButton,
    isValidEmail: isValidEmail(email),
    handleEmailChange,
    handleSubmit,
    handleKeyPress,
  };
}
