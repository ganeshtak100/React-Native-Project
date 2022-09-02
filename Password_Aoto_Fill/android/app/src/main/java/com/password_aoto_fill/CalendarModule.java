package com.password_aoto_fill;

import android.util.Log;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.HashMap;
import java.util.Map;

public class CalendarModule extends ReactContextBaseJavaModule {
  @ReactMethod(isBlockingSynchronousMethod = true)
  int count=0;
  CalendarModule(ReactApplicationContext context) {
    super(context);
  }



  @ReactMethod
  public void createCalendarEvent(
    String name,
    String location,
    Callback callback
  ) {
    Log.d(
      "CalendarModule",
      "Create event called with name: " + name + " and location: " + location
    );
    Integer eventId = 111;
    callback.invoke(eventId);
  }

  @ReactMethod
  public void CounterIncremenet(Callback callback) {
   count=count+1;
    Log.d(
            "Counter Value",
            "Counter activated," + count
    );

    callback.invoke(count);
  }
  @ReactMethod
  public void CounterDecremenet(Callback callback) {
    count=count-1;
    Log.d(
            "Counter Value",
            "Counter activated" + count
    );

    callback.invoke(count);
  }

  @NonNull
  @Override
  public String getName() {
    return "CalendarModule";
  }
}
