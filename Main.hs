{-# LANGUAGE OverloadedStrings #-}

import Network.Wai.Middleware.Static
import Web.Scotty
import System.IO.Error (tryIOError)
import System.Environment
import Control.Monad

main = do
  port <- liftM (either (const 3000) read) . tryIOError $ getEnv "PORT"
  scotty port $ do
    middleware $ staticPolicy (noDots >-> addBase "static")
    get "/" $ file "static/index.html"
  
