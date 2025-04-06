// app/task/page.tsx
import { redirect } from "next/navigation";

export default function page() {
  //判断是否登录
  
  /*
   * if(login){
   * homepage
   * }else{
   * loginpage
   * }
   */


  // 项目启动加载所以的task  hobit  tags   listicle  notification  保存在indexedb中  并且在redux中保存数据的索引映射
  redirect("/task/all");



}
