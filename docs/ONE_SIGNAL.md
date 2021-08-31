# One Signal Set Up

This will explain how to use One Signal to set up push notifications

## iOS

First, you will need to create a certificate from Apple for iOS. Click on your app in the [identifiers list](https://developer.apple.com/account/resources/identifiers/list) in the Apple Developer Portal and then scroll down to configure a push certificate.

![push certificate](https://files-2h6hsvm7p.vercel.app)

You will need to generate a Certificate Signing Request for Apple, use the following command

```
openssl genrsa -out myprivate.key 2048
openssl req -new -key myprivate.key -out csr.certSigningRequest
```

Fill Prompts with this info:

```
Country Name (2 letter code) []: US
State or Province Name (full name) []: United States
Locality Name (eg, city) []:
Organization Name (eg, company) []: Apple Inc.
Organizational Unit Name (eg, section) []: Apple Worldwide Developer Relations
Common Name (eg, fully qualified host name) []: Apple Worldwide Developer Relations Certification Authority
Email Address []: your-email
```

You will then be asked for a challenge password, which you will need in the next step.

```
Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
```

Upload new CSR to download a `.cer` file from Apple, then convert to `.p12`, **_remember the password!_**

```
openssl x509 -inform DER -outform PEM -in <CERTIFICATE>.cer -out cert.pem
openssl pkcs12 -inkey myprivate.key -in cert.pem -export -out cert.p12
```

Now go to [OneSignal](onesignal.com) and create a new app. Choose iOS as the platform first. Upload your new `.p12` certificate, using the password I told you to remember.

![onesignal onboarding](https://files-rb3fdjqiv.vercel.app)

Use the App ID it gives you and add this key to your app `.env` file.

```
ONE_SIGNAL_KEY=<key>
```
