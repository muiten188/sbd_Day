package com.saobacdau_event;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.iou90.autoheightwebview.AutoHeightWebViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.mackentoch.beaconsandroid.BeaconsAndroidPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.evollu.react.fcm.FIRMessagingPackage;

import org.reactnative.camera.RNCameraPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.solinor.bluetoothstatus.RNBluetoothManagerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  @Override
  public void onCreate() {
    super.onCreate();
    //AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new AutoHeightWebViewPackage(), new RNCameraPackage(),
          new ReactVideoPackage(), new BeaconsAndroidPackage(), new ReactNativeYouTube(), new RNI18nPackage(),
          new FIRMessagingPackage(), new VectorIconsPackage(),new RNBluetoothManagerPackage());
    }

    // @Override
    // protected String getJSMainModuleName() {
    // return "index";
    // }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
}
