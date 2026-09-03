# Launching patient referrals

The patient referral UI is disabled by default.

To include it in a Web deployment, configure:

```text
NEXT_PUBLIC_PATIENT_REFERRALS_ENABLED=true
```

Without that exact value, Home, account menu, referral checkout and `/pedir/invitar` remain unavailable. Business state always comes from the patient referral backend endpoints.
