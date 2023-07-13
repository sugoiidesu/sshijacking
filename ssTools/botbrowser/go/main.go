package main

import (
	"flag"
	"fmt"
	"log"
	"math"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/tebeka/selenium"
	"github.com/tebeka/selenium/chrome" // hapus komentar kode ini jika kamu menggunakan chrome
	// "github.com/tebeka/selenium/firefox" // hapus komentar kode ini jika kamu menggunakan firefox
)

type Cookie struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

func main() {
	addressPtr := flag.String("address", "", "Alamat")
	cookiePtr := flag.String("cookie", "", "Cookie")

	flag.Parse()

	if *addressPtr == "" || *cookiePtr == "" {
		fmt.Println("use: ./browserbot --address [url] --cookie [your_cookie]")
		fmt.Println("example: ./browserbot --address https://facebook.com --cookie 'cookieName1=cookieValue2;cookieName2=cookieValue2'")
		os.Exit(1)
	}


	service, err := selenium.NewChromeDriverService("./chromedriver", 4444) // hapus komentar kode ini jika kamu menggunakan chromedrive
    // service, err := selenium.NewGeckoDriverService("./geckodriver", 4444) // hapus komentar kode ini jika kamu menggunakan firefox geckodriver
    if err != nil {
        panic(err)
    }
    defer service.Stop()

	// hapus komentar kode ini jika kamu menggunakan chromedrive
    caps := selenium.Capabilities{}
    caps.AddChrome(chrome.Capabilities{Args: []string{
        "window-size=1920x1080",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "disable-gpu",
    }})

	// hapus komentar kode ini jika kamu menggunakan firefox geckodriver
	// caps.AddFirefox(firefox.Capabilities{Args: []string{
    //     "window-size=1920x1080",
    //     "--no-sandbox",
    //     "--disable-dev-shm-usage",
    //     "disable-gpu",
    // }})

    driver, err := selenium.NewRemote(caps, "")
    if err != nil {
        panic(err)
    }

	go func() {
		err := driver.Get(*addressPtr)
		if err != nil {
			fmt.Println("Error running ChromeDriver:", err)
		}
		cookieData := *cookiePtr
		cookieParts := strings.Split(cookieData, ";")

		for _, part := range cookieParts {
			part = strings.TrimSpace(part)
			cookiePair := strings.Split(part, "=")

			if len(cookiePair) == 2 {
				cookie := Cookie{
					Name:  cookiePair[0],
					Value: cookiePair[1],
				}
				kuki := selenium.Cookie{
					Name:   cookie.Name,
					Value:  cookie.Value,
					Expiry: math.MaxUint32,
				}
				driver.AddCookie(&kuki)
			}
		}
		
		err = driver.Refresh()
		if err != nil {
			log.Fatal(err)
		}
		driver.GetCookies()


	}()
	time.Sleep(2 * time.Second)
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, syscall.SIGINT, syscall.SIGTERM)
	<-signalChan
}
