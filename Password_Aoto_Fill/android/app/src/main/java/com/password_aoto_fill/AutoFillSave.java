package com.password_aoto_fill;

import static android.content.Context.MODE_PRIVATE;

import android.content.SharedPreferences;
import android.util.Log;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AutoFillSave extends ReactContextBaseJavaModule {
  //    @ReactMethod(isBlockingSynchronousMethod = true)
  int count = 0;

  AutoFillSave(ReactApplicationContext context) {
    super(context);
  }

  @ReactMethod
  public void save(
    String email,
    String password,
    String domain,
    Callback callback
  ) {
    Log.d("AutoFillData", "data are " + email + password  + domain);
    Integer eventId = 111;



    // Save them using SharedPreferences
              SharedPreferences.Editor editor = getReactApplicationContext().getSharedPreferences("EMAIL_STORAGE", MODE_PRIVATE)
//    getSharedPreferences("EMAIL_STORAGE", MODE_PRIVATE)
                      .edit();

              editor.putString("PRIMARY_EMAIL", email);
              editor.putString("PASSWORD", password);
              editor.putString("DOMAIN", domain);
              editor.commit();
              callback.invoke(email);

              return;


  }

  @NonNull
  @Override
  public String getName() {
    return "AutoFillSave";
  }
}
