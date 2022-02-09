namespace ResumeBuilder.GeneralUtils
{
    public static class Function
    {
        public static void Run(Action action) => action();

        public static Action Build(Action action) => action;
        public static Action<TParam> Build<TParam>(Action<TParam> action) => action;
        public static Action<TParam1, TParam2> Build<TParam1, TParam2>(Action<TParam1, TParam2> action) => action;
        public static Action<TParam1, TParam2, TParam3> Build<TParam1, TParam2, TParam3>(Action<TParam1, TParam2, TParam3> action) => action;
        public static Action<TParam1, TParam2, TParam3, TParam4> Build<TParam1, TParam2, TParam3, TParam4>(Action<TParam1, TParam2, TParam3, TParam4> action) => action;
        public static Action<TParam1, TParam2, TParam3, TParam4, TParam5> Build<TParam1, TParam2, TParam3, TParam4, TParam5>(Action<TParam1, TParam2, TParam3, TParam4, TParam5> action) => action;


        public static Func<TResult> Build<TResult>(Func<TResult> function) => function;
        public static Func<TParam, TResult> Build<TParam, TResult>(Func<TParam, TResult> function) => function;
        public static Func<TParam1, TParam2, TResult> Build<TParam1, TParam2, TResult>(Func<TParam1, TParam2, TResult> function) => function;
        public static Func<TParam1, TParam2, TParam3, TResult> Build<TParam1, TParam2, TParam3, TResult>(Func<TParam1, TParam2, TParam3, TResult> function) => function;
        public static Func<TParam1, TParam2, TParam3, TParam4, TResult> Build<TParam1, TParam2, TParam3, TParam4, TResult>(Func<TParam1, TParam2, TParam3, TParam4, TResult> function) => function;
        public static Func<TParam1, TParam2, TParam3, TParam4, TParam5, TResult> Build<TParam1, TParam2, TParam3, TParam4, TParam5, TResult>(Func<TParam1, TParam2, TParam3, TParam4, TParam5, TResult> function) => function;

        public static TResult Evaluate<TResult>(Func<TResult> function) => function();

        public static void TryCatch(Action Try, Action<Exception> Catch) { try { Try(); } catch (Exception exception) { Catch(exception); } }
        public static T TryCatch<T>(Func<T> Try, Func<Exception, T> Catch) { try { return Try(); } catch (Exception exception) { return Catch(exception); } }
        public static T TryOrDefault<T>(Func<T> Try) { try { return Try(); } catch (Exception) { return default(T); } }
    }

    public delegate void OutAction<TOutResult>(out TOutResult result);
    public delegate void OutAction<TOutResult1, TOutResult2>(out TOutResult1 result1, out TOutResult2 result2);


    public delegate TResult OutFunc<TOutResult, TResult>(out TOutResult result);
    public delegate TResult OutFunc<TSource, TOutResult, TResult>(TSource value, out TOutResult result);
    public delegate TResult OutFunc<TSource, TOutResult1, TOutResult2, TResult>(TSource value, out TOutResult1 result1, out TOutResult2 result2);
}
