package com.apolloschurchapp;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.zoontek.rnbootsplash.RNBootSplash;
import com.facebook.react.GoogleCastActivity;

public class MainActivity extends GoogleCastActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "apolloschurchapp";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
SplashScreen.show(this, R.style.SplashScreenTheme);        super.onCreate(savedInstanceState);
SplashScreen.show(this, R.style.SplashScreenTheme);        RNBootSplash.init(R.drawable.bootsplash, com.apolloschurchapp.MainActivity.this);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
         return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
      };
    }
}
