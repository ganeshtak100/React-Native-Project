 package com.password_aoto_fill;

 import android.app.assist.AssistStructure;
 import android.content.SharedPreferences;
 import android.os.Build;

 import com.example.password_auto_fill.R;
// import com.password_aoto_fill.R;

 import android.os.CancellationSignal;
 import android.service.autofill.AutofillService;
 import android.service.autofill.Dataset;
 import android.service.autofill.FillCallback;
 import android.service.autofill.FillContext;
 import android.service.autofill.FillRequest;
 import android.service.autofill.FillResponse;
 import android.service.autofill.SaveCallback;
 import android.service.autofill.SaveRequest;
 import android.util.Log;
 import android.view.autofill.AutofillValue;
 import android.widget.RemoteViews;
 import androidx.annotation.NonNull;
 import androidx.annotation.RequiresApi;
 import java.util.ArrayList;
 import java.util.List;

 @RequiresApi(api = Build.VERSION_CODES.O)
 public class EmailAddressFiller extends AutofillService {

   void identifyEmailFields(
     AssistStructure.ViewNode node,
     List<AssistStructure.ViewNode> emailFields
   ) {
     Log.d("node email data==>>", String.valueOf(node.getText()));
     if (node.getClassName().contains("EditText")) {
       String viewId = node.getIdEntry();
       Log.d("view id==", String.valueOf(node.getIdPackage()));
       if (
         viewId != null &&
         (
           viewId.contains("email") ||
           viewId.contains("username") ||
           (node.getText() == "Login") ||
           (node.getText() == "Sign")
         )
       ) {
         emailFields.add(node);
         //                Log.d("emailFILEDS==", String.valueOf(emailFields));
         return;
       }
     }
     for (int i = 0; i < node.getChildCount(); i++) {
       identifyEmailFields(node.getChildAt(i), emailFields);
     }
   }

   void identifyPasswordFields(
     AssistStructure.ViewNode node,
     List<AssistStructure.ViewNode> passwordFields
   ) {
     Log.d("node password data==>>", String.valueOf(node.getText()));

     if (node.getClassName().contains("EditText")) {
       String viewId = node.getIdEntry();

       if (viewId != null && (viewId.contains("password"))) {
         passwordFields.add(node);
         Log.d("passwordFILEDS==", String.valueOf(passwordFields));
         return;
       }
     }
     for (int i = 0; i < node.getChildCount(); i++) {
       identifyPasswordFields(node.getChildAt(i), passwordFields);
     }
   }

   @Override
   public void onFillRequest(
     @NonNull FillRequest fillRequest,
     @NonNull CancellationSignal cancellationSignal,
     @NonNull FillCallback fillCallback
   ) {
     List<AssistStructure.ViewNode> emailFields = new ArrayList<>();
     List<AssistStructure.ViewNode> passwordFields = new ArrayList<>();

     List<FillContext> fillContexts = fillRequest.getFillContexts();

     // Get the structure from the request
     //        List<AssistStructure> structures =
     //                fillContexts.stream().map(FillContext::getStructure).collect(toList());
     List<FillContext> context = fillRequest.getFillContexts();
     AssistStructure structure = context.get(context.size() - 1).getStructure();
     //        Log.d("d-->>>", String.valueOf(structure));
     //        Log.d("d=====", String.valueOf(structures));

     identifyEmailFields(
       structure.getWindowNodeAt(0).getRootViewNode(),
       emailFields
     );

     identifyPasswordFields(
       structure.getWindowNodeAt(0).getRootViewNode(),
       passwordFields
     );

     //        // Do nothing if no email fields found
     if (emailFields.size() == 0) return;

     // Load the email addresses from preferences
     SharedPreferences sharedPreferences = getSharedPreferences(
       "EMAIL_STORAGE",
       MODE_PRIVATE
     );
     String primaryEmail = sharedPreferences.getString("PRIMARY_EMAIL", "");
     String password = sharedPreferences.getString("PASSWORD", "");


     // Create remote views for both the email addresses
     RemoteViews rvPrimaryEmail = new RemoteViews(getPackageName(), R.layout.email_suggestion);
     rvPrimaryEmail.setTextViewText(R.id.email_suggestion_item, primaryEmail);

     RemoteViews rvSecondaryEmail = new RemoteViews(getPackageName(),R.layout.email_suggestion);
     rvSecondaryEmail.setTextViewText(R.id.email_suggestion_item, password);

     // Choose the first email field
     AssistStructure.ViewNode emailField = emailFields.get(0);
     AssistStructure.ViewNode passwordField = passwordFields.get(0);

     Log.d("passwordfield id--", String.valueOf(passwordField.getAutofillId()));
     Log.d("secondary id--", String.valueOf(password));
     Log.d("primary id--", String.valueOf(primaryEmail));

     // Create a dataset for the email addresses
     Dataset primaryEmailDataSet = new Dataset.Builder(rvPrimaryEmail)
       .setValue(
         passwordField.getAutofillId(),
         AutofillValue.forText(password)
       )
       .setValue(emailField.getAutofillId(), AutofillValue.forText(primaryEmail))
       .build();

     //        Dataset secondaryEmailDataSet = new Dataset.Builder(rvSecondaryEmail)
     //                .setValue(
     //                        emailField.getAutofillId(),
     //                        AutofillValue.forText(secondaryEmail)
     //                ) .setValue(
     //                        emailField.getAutofillId(),
     //                        AutofillValue.forText(secondaryEmail)
     //                ).build();
     //
     //        // Create a dataset for the password addresses
     //        Dataset passwordSet1 = new Dataset.Builder(rvSecondaryEmail)
     //                .setValue(
     //                        passwordField.getAutofillId(),
     //
     //                        AutofillValue.forText(secondaryEmail)
     //                ).build();
     //        Dataset passwordSet2 = new Dataset.Builder(rvSecondaryEmail)
     //                .setValue(
     //                        passwordField.getAutofillId(),
     //                        AutofillValue.forText(secondaryEmail)
     //                ).build();

     // Create and send response with both datasets
     FillResponse response = new FillResponse.Builder()
       .addDataset(primaryEmailDataSet)
       //                .setSaveInfo(new SaveInfo.Builder(SaveInfo.SAVE_DATA_TYPE_EMAIL_ADDRESS | SaveInfo.SAVE_DATA_TYPE_USERNAME | SaveInfo.SAVE_DATA_TYPE_PASSWORD, new AutofillId[]{emailField.getAutofillId(), emailField.getAutofillId()}).build())
       //                .addDataset(passwordSet1)
       //                .setSaveInfo(new SaveInfo.Builder(SaveInfo.SAVE_DATA_TYPE_EMAIL_ADDRESS | SaveInfo.SAVE_DATA_TYPE_USERNAME | SaveInfo.SAVE_DATA_TYPE_PASSWORD, new AutofillId[]{emailField.getAutofillId(), emailField.getAutofillId()}).build())
       .build();
     fillCallback.onSuccess(response);
     //        // Create and send response with both datasets
     //        FillResponse response = new FillResponse.Builder()
     //                .addDataset(new Dataset.Builder()
     //                        .setValue(emailField.getAutofillId(),
     //                                AutofillValue.forText(primaryEmail)
     //
     //                                )
     //                        .setValue( emailField.getAutofillId(),
     //                                AutofillValue.forText(secondaryEmail)
     //                                ).build())
     //                .setSaveInfo(new SaveInfo.Builder(SaveInfo.SAVE_DATA_TYPE_EMAIL_ADDRESS | SaveInfo.SAVE_DATA_TYPE_USERNAME | SaveInfo.SAVE_DATA_TYPE_PASSWORD,new AutofillId[]{emailField.getAutofillId(), emailField.getAutofillId()}).build())
     //                .addDataset(secondaryEmailDataSet).setSaveInfo(new SaveInfo.Builder(SaveInfo.SAVE_DATA_TYPE_EMAIL_ADDRESS | SaveInfo.SAVE_DATA_TYPE_USERNAME | SaveInfo.SAVE_DATA_TYPE_PASSWORD,new AutofillId[]{emailField.getAutofillId(), emailField.getAutofillId()}).build())
     //                .build();
     //        fillCallback.onSuccess(response);
     //
   }

   @Override
   public void onSaveRequest(
     @NonNull SaveRequest request,
     @NonNull SaveCallback callback
   ) {
     // Get the structure from the request
     List<FillContext> context = request.getFillContexts();
     AssistStructure structure = context.get(context.size() - 1).getStructure();

     // Traverse the structure looking for data to save
     traverseStructure(structure);

     // Persist the data, if there are no errors, call onSuccess()
     callback.onSuccess();
   }

   public void traverseStructure(AssistStructure structure) {
     int nodes = structure.getWindowNodeCount();

     for (int i = 0; i < nodes; i++) {
       AssistStructure.WindowNode windowNode = structure.getWindowNodeAt(i);
       AssistStructure.ViewNode viewNode = windowNode.getRootViewNode();
       traverseNode(viewNode);
     }
   }

   public void traverseNode(AssistStructure.ViewNode viewNode) {
     if (
       viewNode.getAutofillHints() != null &&
       viewNode.getAutofillHints().length > 0
     ) {
       // If the client app provides autofill hints, you can obtain them using:
       viewNode.getAutofillHints();
     } else {
       // Or use your own heuristics to describe the contents of a view
       // using methods such as getText() or getHint().
     }

     for (int i = 0; i < viewNode.getChildCount(); i++) {
       AssistStructure.ViewNode childNode = viewNode.getChildAt(i);
       traverseNode(childNode);
     }
   }
 }
