js
---------
npm install selenium-webdriver



java
-------

mvn archetype:generate -DgroupId=com.browserbot -DartifactId=browserbot -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false


<dependencies>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>3.141.59</version>
    </dependency>
</dependencies>

mvn clean install
mvn compile exec:java
mvn exec:java -Dexec.mainClass="com.browserbot.App"
java -jar browserbot-1.0-SNAPSHOT.jar --address https://facebook.com --cookie aa
----
export MAVEN_HOME=/path/to/maven
export PATH=$PATH:$MAVEN_HOME/bin


Go
______
go init
go get github.com/tebeka/selenium

