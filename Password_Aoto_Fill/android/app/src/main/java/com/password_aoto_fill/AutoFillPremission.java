// package com.example.password_auto_fill;

// import android.content.SharedPreferences;
// import android.os.Build;
// import android.os.Bundle;
// import android.view.View;
// import android.widget.EditText;
// import android.widget.Toast;
// import androidx.annotation.RequiresApi;
// import androidx.appcompat.app.AppCompatActivity;

// public class AutoFillPremission extends AppCompatActivity {
//   private static final int REQUEST_ID = 11;

//   @RequiresApi(api = Build.VERSION_CODES.M)
//   @Override
//   protected void onCreate(Bundle savedInstanceState) {
//     super.onCreate(savedInstanceState);
//     setContentView(R.layout.activity_main);
//   }

//   public void saveEmailAddresses(View view) {
//     //        Log.d("responce msg==========","fgff");

//     //        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
//     //            AutofillManager af=getSystemService(AutofillManager.class);
//     //            if(af.isAutofillSupported()){
//     //                if(af.hasEnabledAutofillServices()){
//     //                    af.commit();
//     ////                    Toast.makeText(this,"Available", Toast.LENGTH_LONG).show();
//     ////                    finish();
//     //                    return;
//     //                }
//     //
//     //                else {
//     ////                    af.requestAutofill(view);
//     ////                    af.commit();
//     //                    Uri uri= Uri.parse("package:"+getPackageName());
//     //                    Intent i=new Intent(Settings.ACTION_REQUEST_SET_AUTOFILL_SERVICE, uri);
//     ////                    Log.d("responce msg", String.valueOf(i));
//     //
//     //                    startActivityForResult(i, REQUEST_ID);
//     //                }
//     //            }
//     //            else {
//     //                Toast.makeText(this, "Autofill service Not supported", Toast.LENGTH_LONG).show();
//     //                finish();
//     //            }
//     //        }

//     // Get both email addresses
//     //         String primaryEmailAddress = ((EditText)findViewById(R.id.email))
//     //                 .getText().toString();
//     //         String secondaryEmailAddress = ((EditText)findViewById(R.id.password))
//     //                 .getText().toString();

//     //         // Save them using SharedPreferences
//     //         SharedPreferences.Editor editor = getSharedPreferences("EMAIL_STORAGE", MODE_PRIVATE)
//     //                 .edit();
//     //         editor.putString("PRIMARY_EMAIL", primaryEmailAddress);
//     //         editor.putString("SECONDARY_EMAIL", secondaryEmailAddress);
//     //         editor.commit();

//     // //        Load the email addresses from preferences
//     //         SharedPreferences sharedPreferences = getSharedPreferences("EMAIL_STORAGE", MODE_PRIVATE);
//     //         String primaryEmail = sharedPreferences.getString("PRIMARY_EMAIL", "");
//     //         String secondaryEmail = sharedPreferences.getString("SECONDARY_EMAIL", "");
//     //         Toast.makeText(this, primaryEmail, Toast.LENGTH_LONG).show();
//     //         Toast.makeText(this, secondaryEmail, Toast.LENGTH_LONG).show();

//     return;
//   }
// }
