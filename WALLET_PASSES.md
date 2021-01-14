# Set up Apple Wallet Pass

[Download WWDR](https://www.apple.com/certificateauthority/)

[PIC]

Convert `wwdr.cer` to `.pem`

```
openssl x509 -inform DER -outform PEM -in wwdr.cer -out wwdr.pem
```

[Add new Pass Type ID to Apple Dev Team](https://developer.apple.com/account/resources/identifiers/list/passTypeId)

[PIC]

Click on new ID and click _Create Certificate_

[PIC]

Create CSR:

```
openssl genrsa -out myprivate.key 2048
openssl req -new -key myprivate.key -out csr.certSigningRequest
```

Fill Prompts with this info:

```
Country Name (2 letter code) [AU]: US
State or Province Name [Some-State]: United States
Locality Name []:
Organization Name []: Apple Inc.
Organizational Unit Name []: Apple Worldwide Developer Relations
Common Name []: Apple Worldwide Developer Relations Certification Authority
Email Address []: your-email
```

Upload new CSR to download the Certificate

[PIC]

Convert certificate to `.pem`:

```
openssl x509 -inform DER -outform PEM -in <CERTIFICATE>.cer -out signerCert.pem
```

Convert private key to `.pem`, **remember the passphrase you choose!**

```
openssl rsa -in myprivate.key -outform PEM -out signerKey.pem
```

Add new environment variables, pasting in new certs and password, swapping returns with `\n`

```
PASS_WWDR_CERT=<WWDR.pem>
PASS_SIGNER_CERT=<signerCert.pem>
PASS_SIGNER_KEY=<signerKey.pem>
PASS_SIGNER_PASSPHRASE=<new-password>
```

Set the API URL as an environment variable to pull the template file from

```
ROOT_URL=http://localhost:4000
```

Start up the server and check this query works properly:

```
query {
  userPass {
    id
    type
    description
    logo { uri }
    thumbnail { uri }
    barcode { uri }
    primaryFields {
      key
      label
      value
      textAlignment
    }
    secondaryFields {
      key
      label
      value
      textAlignment
    }
    backgroundColor
    foregroundColor
    labelColor
    logoText
    passkitFileUrl
  }
}
```

Check that you can download the binary

`curl -H "authorization: <AUTH_TOKEN>" <passkitFileUrl>`
