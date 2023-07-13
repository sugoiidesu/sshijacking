import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.json.JSONArray;
import org.json.JSONObject;


public class Kukiurldecode {
    public static void main(String[] args) {
        // Mengecek jumlah argumen yang diberikan
        if (args.length > 1 && args[0].equals("-u")) {
            if (args.length > 1 && args[0].equals("-u")) {
                String urlEncodedData = args[1];
                try {
                    String decodedData = URLDecoder.decode(urlEncodedData, "UTF-8");
                    // System.out.println(decodedData);
                    JSONObject json = new JSONObject();
                    String[] pairs = decodedData.split("&");
                    for (String pair : pairs) {
                        String[] keyValue = pair.split("=");
                        String key = URLDecoder.decode(keyValue[0], "UTF-8");
                        String value = URLDecoder.decode(keyValue[1], "UTF-8");

                        JSONArray jsonArray = json.optJSONArray(key);
                        if (jsonArray == null) {
                            jsonArray = new JSONArray();
                            json.put(key, jsonArray);
                        }
                        jsonArray.put(value);
                    }
                    String cleanedJson = json.toString().replace("[]", "");
                    JSONObject jsonObject = new JSONObject(cleanedJson);
                    JSONArray namaArray = jsonObject.getJSONArray("nama");
                    JSONArray isiArray = jsonObject.getJSONArray("isi");

                    StringBuilder result = new StringBuilder();
                    for (int i = 0; i < isiArray.length(); i++) {
                        String key = namaArray.getString(i);
                        String value = isiArray.getString(i);
                        result.append(key).append("=").append(value);
                        if (i < isiArray.length() - 1) {
                            result.append(";");
                        }
                    }
                    System.out.println("\n\nyour cookie:");
                    System.out.println(result.toString());

                    // JSONObject jsonObject = new JSONObject(json);

                    
                    // System.out.println(json);

            
                } catch (UnsupportedEncodingException e) {
                    System.out.println("Error: Unsupported encoding.");
                }
            } else {
                System.out.println("Usage: java Kukiurldecode -u <url_encoded_data>");
            }

            // String decodedData = URLDecoder.decode(parameter, "UTF-8");

            // // Membuat objek JSON
            
        } else {
            System.out.println("Penggunaan: java Main -u <parameter>");
        }
    }
}