using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mvcReduxLab.ViewModels
{
    public class LikeInfoFormDataVM
    {
        public LikeInfo likeInfo { get; set; }

        #region nasted class

        public class LikeInfo
        {
            public string idName { get; set; }
            public int likeCount { get; set; }
            public int dislikeCount { get; set; }

        }

        #endregion
    }


}