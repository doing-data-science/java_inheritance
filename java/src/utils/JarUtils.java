package utils;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

public class JarUtils {

	public static void main(String[] args) {
		try {
			String jarFile = System.getProperty("java.home") + "/lib/rt.jar";
			jarFile = "/opt/android-sdks/platforms/android-23/uiautomator.jar";
			getClassNameByJar(jarFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static List<String> getClassNameByJar(String jarFilePath) {
		List<String> myClassName = new ArrayList<String>();

		try {
			JarFile jarFile = new JarFile(jarFilePath);
			Enumeration<JarEntry> entrys = jarFile.entries();

			while (entrys.hasMoreElements()) {

				JarEntry jarEntry = entrys.nextElement();
				String entryName = jarEntry.getName();

				if (entryName.endsWith(".class")) {
				  System.out.println(entryName);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return myClassName;
	}
}
