import Network.Socket
import Network.Socket.ByteString (recv, sendAll)
import qualified Data.ByteString.Char8 as BS

main :: IO ()
main = withSocketsDo $ do
    addrInfo <- getAddrInfo (Just defaultHints { addrFlags = [AI_PASSIVE] }) Nothing (Just "6969")
    let serverAddr = head addrInfo
    sock <- socket (addrFamily serverAddr) Stream defaultProtocol
    bind sock (addrAddress serverAddr)
    listen sock 5
    putStrLn "Listening on port 6969..."
    acceptConnections sock

acceptConnections :: Socket -> IO ()
acceptConnections sock = do
    (clientSock, clientAddr) <- accept sock
    putStrLn $ "Accepted connection from: " ++ show clientAddr
    handleClient clientSock
    acceptConnections sock

handleClient :: Socket -> IO ()
handleClient clientSock = do
    msg <- recv clientSock 1024
    if BS.null msg
        then close clientSock
        else do
            putStrLn $ "Received message: " ++ BS.unpack msg
            sendAll clientSock (BS.pack "Server received your message\n")
            handleClient clientSock
