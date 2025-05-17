version="v.1.0.4"

# Login to Azure Container Registry Repository
(docker login complytek.azurecr.io -u complytek -p fGPEM4fYV36Bthu6gKzpLtoGo0WvMesVs4mY/c9QS9+ACRCxzkB5)

(docker push complytek.azurecr.io/clm-cypress:"$version-$type")

(docker tag clm-cypress:$version complytek.azurecr.io/clm-cypress:$version)
(docker push complytek.azurecr.io/clm-cypress:$version)