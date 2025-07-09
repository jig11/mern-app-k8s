
------------
User service
------------
1) cd to user-service
2) > minikube start --driver=docker
3) > eval $(minikube docker-env)
4) > docker build -t user-service-k8s:latest .
5) > docker images | grep user
6) > kubectl apply -f k8s-user-service.yaml
7) > kubectl get pods   // show list of 2 pods with user-service-XXXXX
8) > kubectl get deployments
9) > kubectl get service

10) > minikube service user-service --url //http://127.0.0.1:36749/ here we can access our App but this is not cloud friendly
hence use, 
    1) > change k8s-user-service.yaml spec.type from ClusterIP to LoadBalancer
    2) > apply this changes > kubectl apply -f  k8s-user-service.yaml
    3) new terminal, > minikube tunnel
    4) > kubectl get service //wait till External IP is assigned,
        NAME           TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)  AGE
        user-service   LoadBalancer   <IPADDR>   <pending>     80:30701/TCP   48m
        user-service   LoadBalancer   <IPADDR>   127.0.0.1     80:30701/TCP   49m 

11) verify in browser with External IP for endpoints ->  http://127.0.0.1/,http://127.0.0.1/healthz //should work. 
