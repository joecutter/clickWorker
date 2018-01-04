import { Http,Headers, Response,RequestOptions } from '@angular/http';
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

 //Models
import { Posts } from '../Model/employerPosts';

@Injectable()
export class ClickService {

private Url = "";
public id:any;
public userID:any;
public employerID:any;  

data:any;
  constructor (private http: Http) {
    this.id = localStorage.getItem("id");
    this.userID = localStorage.getItem("userID");
    this.employerID = localStorage.getItem("employerID");
  }

  // signUp
  postUser(newUser){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3100/register",JSON.stringify(newUser), {headers:headers})
      .map(res => res.json());
  }

  // signUp_workerInfo
  postworkerInfo(work){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3100/register/worker/info/"+this.userID,JSON.stringify(work), {headers:headers})
      .map(res => res.json());
  }

  // signIn
  enterUser(oldUser){
    var headers = new Headers();
    var respond;
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3100/login",JSON.stringify(oldUser), {headers:headers})
      .map(res => res.json());
  }

  // set userProfile
  setProfile(userProfile){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3100/profile/"+this.id,JSON.stringify(userProfile), {headers:headers})
      .map(res => res.json());
  }

  // get userProfile
  getProfile(){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3100/profile/"+this.id, {headers:headers})
      .map(res => res.json());
  }

  // PostJob
  setJob(post_job){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3100/employer",JSON.stringify(post_job), {headers:headers})
      .map(res => res.json());
  }

  // getPostJob
  getJob(): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3100/employer/postedJobs")
        .map(this.extractData);
}

  private extractData(res:Response) {
    let body = res.json();
    return body || [];
  }

  //Handle Error
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
}

//post applyJob
applyJob(fetch){
  var headers = new Headers();
  var respond;
  headers.append('Content-Type','application/json');
  return this.http.post("http://localhost:3100/histo",JSON.stringify(fetch), {headers:headers})
    .map(res => res.json());
}

//get applyJob
getApplyJob(){
  var headers = new Headers();
  var respond;
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3100/histo", {headers:headers})
    .map(res => res.json());
}

//setEmployer DeTAILS
setEmployerDetails(info){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post("http://localhost:3100/register/employerProfile",JSON.stringify(info), {headers:headers})
    .map(res => res.json());

}

//getEmployer DeTAILS
getEmployerDetails(email){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post("http://localhost:3100/employer/employerDetails",JSON.stringify(email), {headers:headers})
    .map(res => res.json());

}

//setCompanyDetails DeTAILS
setCompanyDetails(info){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post("http://localhost:3100/register/employer/company/"+this.employerID,JSON.stringify(info), {headers:headers})
    .map(res => res.json());

}

//getCompanyDetails DeTAILS
getCompanyDetails(){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3100/employer/companyDetails",{headers:headers})
    .map(res => res.json());

}


//sendCoverLetter ApplyJob
SendCover(cover){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post("http://localhost:3100/user",JSON.stringify(cover), {headers:headers})
    .map(res => res.json());
}

//retrive ApplyJob
getSendCover(){
  var headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get("http://localhost:3100/user/retrive", {headers:headers})
    .map(res => res.json());
}

}
