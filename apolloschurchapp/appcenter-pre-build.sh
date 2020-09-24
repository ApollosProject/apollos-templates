#!/usr/bin/env bash

droid_dir=$(pwd)/android

cp $droid_dir/gradle.properties.appcenter $droid_dir/gradle.properties

cd ios
pod install
cd ..

# You can comment this out if your app doesn't have an existing build number.
VERSION_CODE=$((VERSION_CODE_SHIFT + APPCENTER_BUILD_ID))

echo Using "$VERSION_CODE" as build number

echo $VERSION_CODE
plutil -replace CFBundleVersion -string "$VERSION_CODE" $(pwd)/ios/apolloschurchapp/Info.plist
sed -i "" 's/versionCode [^"]*/versionCode '$VERSION_CODE'/' $(pwd)/android/app/build.gradle

yarn generate-stories