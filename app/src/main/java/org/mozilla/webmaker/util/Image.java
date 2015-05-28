package org.mozilla.webmaker.util;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.ParcelFileDescriptor;
import android.provider.MediaStore;
import android.util.Base64;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileDescriptor;
import java.io.FileNotFoundException;
import java.io.IOException;

public class Image {

    /**
     * ---------------------------------
     * Intent generation
     * ---------------------------------
     */

    /**
     * Returns an ACTION_IMAGE_CAPTURE intent.
     *
     * @param f File instance for image storage
     * @return Intent
     */
    public static Intent getCameraIntent(File f) {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(f));

        return intent;
    }

    /**
     * Returns an ACTION_GET_CONTENT intent (image-only).
     *
     * @param f File instance for image storage
     * @return Intent
     */
    public static Intent getMediaStoreIntent(File f) {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(f));
        intent.putExtra("outputFormat", Bitmap.CompressFormat.JPEG.toString());
        intent.setType("image/*");

        return intent;
    }

    /**
     * ---------------------------------
     * Image manipulation & conversion
     * ---------------------------------
     */

    /**
     * Returns a scaled bitmap from the specified file path.
     *
     * @param path Filepath for bitmap
     * @param reqWidth Maximum width
     * @param reqHeight Maximum height
     * @return Scaled bitmap
     */
    public static Bitmap decodeBitmapFromFile(String path, int reqWidth, int reqHeight) {
        //First decode with inJustDecodeBounds=true to check dimensions
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(path, options);

        // Calculate inSampleSize, raw height and width of image
        final int height = options.outHeight;
        final int width = options.outWidth;
        options.inPreferredConfig = Bitmap.Config.RGB_565;
        int inSampleSize = 1;

        if (height > reqHeight) {
            inSampleSize = Math.round((float) height / (float) reqHeight);
        }

        int expectedWidth = width / inSampleSize;
        if (expectedWidth > reqWidth) {
            inSampleSize = Math.round((float) width / (float) reqWidth);
        }

        // Decode bitmap with inSampleSize set & return
        options.inSampleSize = inSampleSize;
        options.inJustDecodeBounds = false;
        return BitmapFactory.decodeFile(path, options);
    }

    /**
     * Returns a scaled bitmap from the specified file path.
     *
     * @param uri Filepath (URI) for bitmap
     * @param size Maximum width / height
     * @param c Context from calling activity
     * @return Scaled bitmap
     */
    public static Bitmap decodeBitmapFromMediaStore(Uri uri, int size, Context c) {
        ParcelFileDescriptor parcelFD = null;
        Bitmap bitmap = null;

        try {
            parcelFD = c.getContentResolver().openFileDescriptor(uri, "r");
            FileDescriptor imageSource = parcelFD.getFileDescriptor();

            // Decode image size
            BitmapFactory.Options o = new BitmapFactory.Options();
            o.inJustDecodeBounds = true;
            BitmapFactory.decodeFileDescriptor(imageSource, null, o);

            // Find the correct scale value. It should be the power of 2.
            int width_tmp = o.outWidth, height_tmp = o.outHeight;
            int scale = 1;
            while (true) {
                if (width_tmp < size && height_tmp < size) {
                    break;
                }
                width_tmp /= 2;
                height_tmp /= 2;
                scale *= 2;
            }

            // decode with inSampleSize
            BitmapFactory.Options o2 = new BitmapFactory.Options();
            o2.inSampleSize = scale;
            bitmap = BitmapFactory.decodeFileDescriptor(imageSource, null, o2);
        } catch (FileNotFoundException e) {
            // ignored
        }

        if (parcelFD != null) {
            try {
                parcelFD.close();
            } catch (IOException e) {
                // ignored
            }
        }

        return bitmap;
    }

    /**
     * Creates a data URI (RFC 2397) from a provided bitmap.
     *
     * @param bitmap Bitmap to be converted into a datauri
     * @param quality JPEG quality (0-100) for the resulting compressed bitmap
     * @return Data URI
     */
    public static String createDataUriFromBitmap(Bitmap bitmap, int quality) {
        String data = convertBitmapToBase64(bitmap, quality);
        return "data:image/jpg;base64,".concat(data);
    }

    /**
     * ---------------------------------
     * Local methods
     * ---------------------------------
     */

    /**
     * Converts a bitmap to a base64 string.
     *
     * @param image Bitmap to be converted
     * @param quality JPEG quality (0-100) for the resulting compressed bitmap
     * @return Base64 encoded string
     */
    protected static String convertBitmapToBase64(Bitmap image, int quality) {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        image.compress(Bitmap.CompressFormat.JPEG, quality, stream);
        byte[] b = stream.toByteArray();
        return Base64.encodeToString(b, Base64.DEFAULT);
    }

}
