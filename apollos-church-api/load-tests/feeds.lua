-- run this test with `wrk -s feeds.lua <API URL>`
--
wrk.method = "POST"
wrk.headers["content-type"] = "application/json"
wrk.body = '{"query":"{tabFeedFeatures(tab:HOME){id features{id}}}"}'
