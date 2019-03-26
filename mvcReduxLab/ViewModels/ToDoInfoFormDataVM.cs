using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mvcReduxLab.ViewModels
{
    public class ToDoInfoFormDataVM
    {
        public List<TodoInfo> todoInfo { get; set; }

        #region nasted class
        public class TodoInfo
        {
            public string name { get; set; }
            public Boolean complete { get; set; }
            public int likeCount { get; set; }
            public int dislikeCount { get; set; }
        }
        #endregion

    }
}