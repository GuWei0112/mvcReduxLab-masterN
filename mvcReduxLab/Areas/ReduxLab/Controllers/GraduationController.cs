using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using mvcReduxLab.ViewModels;

namespace mvcReduxLab.Areas.ReduxLab.Controllers
{
    public class GraduationController : Controller
    {
        // GET: ReduxLab/Graduation
        public ActionResult Default()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SaveFormData(LikeInfoFormDataVM formData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Response.StatusCode = 400;
                    return Json(ErrorMessageVM.CHECK_DATA_FAIL);
                }

                using (var ctx = new MyDatabaseEntities())
                using (var txn = ctx.Database.BeginTransaction())
                {
                    //## 若已存在則更新，不存在則新增
                    var info = ctx.Like.Find(formData.likeInfo.idName);
                    if (info != null)
                    {
                        //# 已存在則更新
                        //info.name = formData.accountInfo.name; // PK
                        info.likeCount = formData.likeInfo.likeCount;
                        info.dislikeCount = formData.likeInfo.dislikeCount;

                        ctx.SaveChanges();
                        txn.Commit();
                    }
                    else
                    {
                        //# 不存在則新增
                        Like newInfo = new Like()
                        {
                            idName = formData.likeInfo.idName,
                            likeCount = formData.likeInfo.likeCount,
                            dislikeCount = formData.likeInfo.dislikeCount

                        };

                        ctx.Like.Add(newInfo);
                        ctx.SaveChanges();
                        txn.Commit();
                    }
                }

                return Json(ErrorMessageVM.SUCCESS);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new ErrorMessageVM(ex.Message));
            }
        }

        [HttpPost]
        public ActionResult LoadFormData(string name)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Response.StatusCode = 400;
                    return Json(ErrorMessageVM.CHECK_DATA_FAIL);
                }

                using (var ctx = new MyDatabaseEntities())
                {
                    var info = ctx.Like.SingleOrDefault(c => c.idName == name);

                    if (info == null)
                    {
                        Response.StatusCode = 500;
                        return Json(new ErrorMessageVM("無資料。"));
                    }

                    LikeInfoFormDataVM formData = new LikeInfoFormDataVM()
                    {
                        likeInfo = new LikeInfoFormDataVM.LikeInfo
                        {
                            idName = info.idName,
                            likeCount = info.likeCount,
                            dislikeCount = info.dislikeCount
                        },

                    };

                    return Json(formData);
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new ErrorMessageVM(ex.Message));
            }
        }

        [HttpPost]
        public ActionResult SaveToDoFormData(ToDoInfoFormDataVM formData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Response.StatusCode = 400;
                    return Json(ErrorMessageVM.CHECK_DATA_FAIL);
                }
                foreach (var formdata in formData.todoInfo)
                {
                    Console.WriteLine(formdata + "ww");
                    using (var ctx = new MyDatabaseEntities())
                    using (var txn = ctx.Database.BeginTransaction())
                    {
                        //## 若已存在則更新，不存在則新增
                        var info = ctx.ToDo.Find(formdata.name);
                        var Linfo = ctx.Like.Find(formdata.name);
                        if (info != null)
                        {
                            //# 已存在則更新
                            //info.name = formData.accountInfo.name; // PK
                            info.complete = formdata.complete;
                            Linfo.idName = formdata.name;
                            Linfo.likeCount = formdata.likeCount;
                            Linfo.dislikeCount = formdata.dislikeCount;

                            ctx.SaveChanges();
                            txn.Commit();
                        }
                        else
                        {
                            //# 不存在則新增
                            Like newLInfo = new Like()
                            {
                                idName = formdata.name,
                                likeCount = formdata.likeCount,
                                dislikeCount = formdata.dislikeCount

                            };
                            ToDo newInfo = new ToDo()
                            {
                                name = formdata.name,
                                complete = formdata.complete

                            };

                            ctx.Like.Add(newLInfo);
                            ctx.ToDo.Add(newInfo);
                            ctx.SaveChanges();
                            txn.Commit();
                        }
                    }
                }

                return Json(ErrorMessageVM.SUCCESS);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new ErrorMessageVM(ex.Message));
            }
        }
        [HttpPost]
        public ActionResult UpdateToDoFormData(string name)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Response.StatusCode = 400;
                    return Json(ErrorMessageVM.CHECK_DATA_FAIL);
                }

                using (var ctx = new MyDatabaseEntities())
                {
                    var Linfo = ctx.Like.SingleOrDefault(c => c.idName == name);
                    var info = ctx.ToDo.SingleOrDefault(c => c.name == name);

                    if (info == null || Linfo == null)
                    {
                        Response.StatusCode = 500;
                        return Json(new ErrorMessageVM("無資料。"));
                    }

                    ToDoInfoFormDataVM formData = new ToDoInfoFormDataVM()
                    {
                        //todoInfo = new ToDoInfoFormDataVM
                        //{
                        //    name = info.name,
                        //    complete = info.complete,
                        //    likeCount = Linfo.likeCount,
                        //    dislikeCount = Linfo.dislikeCount
                        //}

                    };


                    return Json(formData);
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new ErrorMessageVM(ex.Message));
            }
        }
        [HttpPost]
        public ActionResult DeleteToDoFormData(List<ToDoInfoFormDataVM> formData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Response.StatusCode = 400;
                    return Json(ErrorMessageVM.CHECK_DATA_FAIL);
                }
                //foreach (var formdata in formData)
                //{
                //    using (var ctx = new MyDatabaseEntities())
                //    using (var txn = ctx.Database.BeginTransaction())
                //    {
                //        //## 若已存在則更新，不存在則新增

                //        var info = ctx.ToDo.Find(formdata.name);
                //        var Linfo = ctx.Like.Find(formdata.name);
                //        if (info != null)
                //        {
                //            //# 已存在則更新
                //            //info.name = formData.accountInfo.name; // PK
                //            info.complete = formdata.complete;
                //            Linfo.idName = formdata.name;
                //            Linfo.likeCount = formdata.likeCount;
                //            Linfo.dislikeCount = formdata.dislikeCount;
                //            ctx.Like.Remove(Linfo);
                //            ctx.ToDo.Remove(info);
                //            ctx.SaveChanges();
                //            txn.Commit();
                //        }

                //        else
                //        {
                //            //# 不存在則新增
                //            Like newLInfo = new Like()
                //            {
                //                idName = formdata.name,
                //                likeCount = formdata.likeCount,
                //                dislikeCount = formdata.dislikeCount

                //            };
                //            ToDo newInfo = new ToDo()
                //            {
                //                name = formdata.name,
                //                complete = formdata.complete

                //            };

                //            ctx.Like.Add(newLInfo);
                //            ctx.ToDo.Add(newInfo);
                //            ctx.SaveChanges();
                //            txn.Commit();
                //        }
                //    }
                //}

                return Json(ErrorMessageVM.SUCCESS);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new ErrorMessageVM(ex.Message));
            }
        }
    }
}