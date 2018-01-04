import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,ToastController,LoadingController, Loading } from 'ionic-angular';

//plugins
import { DatePicker } from '@ionic-native/date-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
//provider
import { ClickService } from '../../provider/service';
//model
import { Profile } from '../../Model/profile';

declare var cordova: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers:[ClickService,DatePicker,Camera,FilePath,FileTransfer,File]
})
export class ProfilePage {
profile: Profile[];
username:any;
firstname:any;
lastname:any;
location:any;
phoneNo:any;
email:any;
date:any;
gender:any;
education:any;
certificate:any;
experience:any;
jobType:any;
desc:any;
potfolio:any;
status:any;
sex = ['Male','Female'];
list = ['Work','Hire'];
job = ['Skilled','Unskilled'];
papers = ['High School','Diploma','Degree','Masters','phd'];
workYears = ['less than 1yr','1yr','2yrs','3yrs','more than 4yrs'];
work = ["Full Time",'Short Term','Internship','Volunteer','Other Work type'];
free = ['IMMEDIATELY','1 WEEK','2 WEEKS','3 WEEKS','1 MONTH','2 MONTHS','MORE THAN 3 MONTHS'];

//camera
lastImage: string = null;
loading: Loading;

id:any;
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public click:ClickService,
              private datePicker: DatePicker,
              public actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private file: File,
              private filePath: FilePath,
              private transfer: FileTransfer,
              public navParams: NavParams) {

           this.id = localStorage.getItem("id");
           this. presentLoading();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getInfo();
  }

  presentLoading(){
    let loading=this.loadingCtrl.create({
      content:"Loading....",
      duration:3000,
      dismissOnPageChange:	true
    }).present();
  }


getInfo(){
  this.click.getProfile().subscribe(user =>{
    var response = user;
    console.log(response);

    if(response.code == "200"){
      console.log(response.msg[0]);
      
    }

    // this.username =response.msg[0].username;
    this.firstname =response.msg[0].fname;
    this.lastname =response.msg[0].lname;
    this.location =response.msg[0].location;
    this.phoneNo =response.msg[0].phone_no;
    this.email =response.msg[0].email;
    this.date =response.msg[0].DOB;
    this.gender =response.msg[0].sex;
    // this.education =response.msg[0].education;
    // this.certificate =response.msg[0].certificate;
    // this.experience =response.msg[0].experience;
    // this.jobType =response.msg[0].job;
    // this.desc =response.msg[0].description
    // this.potfolio =response.msg[0].potfolio;
    // this.status =response.msg[0].status;

  });
}

update(event){
    console.log("old User");
    var userProfile = {
      username:this.username,
      gender:this.gender,
      education:this.education,
      certificate:this.certificate,
      experience:this.experience,
      jobType:this.jobType,
      status:"Work"
    }
    this.click.setProfile(userProfile).subscribe(user =>{
      this.profile.push(userProfile);
      this.username ="";
      this.email ="";
      this.date ="";
      this.gender ="";
      this.education ="";
      this.certificate ="";
      this.experience ="";
      this.jobType ="";
      this.desc ="";
      this.potfolio ="";
      this.status ="";

    });
  }

  setProfile(){

  }


  openDatePicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload profile pic',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            console.log('Library clicked');
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Use Camera',
          handler: () => {
            console.log('Camera clicked');
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  // Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  // Destination URL
  var url = "http://localhost:3100/profile/"+this.id;
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: FileTransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}
 
}
