package in.gauravthakur.indexinglife;

import android.content.Intent;
import com.facebook.react.ReactActivity;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatDelegate;

import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {
  @Override
   protected void onCreate(Bundle savedInstanceState) {
     SplashScreen.show(this, R.style.SplashScreenTheme, true);
     super.onCreate(null);
     AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
   }

   @Override
   public void onNewIntent(Intent intent) {
     super.onNewIntent(intent);
     setIntent(intent);
   }
   /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Indexing";
  }
}
