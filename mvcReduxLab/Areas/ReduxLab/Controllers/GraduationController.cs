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
    }
}