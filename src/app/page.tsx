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
  redirect("/task/all");
}