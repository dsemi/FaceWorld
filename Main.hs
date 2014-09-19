{-# LANGUAGE OverloadedStrings #-}

import Network.Wai.Middleware.Static
import Web.Scotty

main = scotty 3000 $ do
  middleware $ staticPolicy (noDots >-> addBase "static")
  get "/" $ file "static/index.html"
  
