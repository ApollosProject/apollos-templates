#!/usr/bin/env bash

droid_dir=$(pwd)/android

cp $droid_dir/gradle.properties.appcenter $droid_dir/gradle.properties

cd ios
pod install

cd ../../..
yarn
yarn lerna run generate-stories
