using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MathsProblems
{
    class ChickenNuggets
    {
        public void Solve()
        {
            Console.WriteLine("What's the highest number uncreatable from combinations of 6, 9 and 20?");

            // set the flags for all the combinations creatable upto the factor cap
            int factorCap = 10;
          
            bool[] results = new bool[(20 * factorCap) + (9 * factorCap) + (6 * factorCap) + 1];

            for (int i = 0; i <= factorCap; i++)
            {
                for (int j = 0; j <= factorCap; j++)
                {
                    for (int k = 0; k <= factorCap; k++)
                    {
                        results[
                                    i * 20 +
                                    j * 9 +
                                    k * 6
                                ] = true;
                    }
                }
            }

            // now find a run of six true values in the results
            int lastIndexOfSix = results.Count() - 1;

            bool foundRunOfSix = false;

            for ( int startIndex = results.Count() - 1; startIndex > 0 && !foundRunOfSix; startIndex-- )
            {
                bool foundAFalse = false;

                for ( int b = 0; !foundAFalse && b < 6; b++ )
                {
                    if ( !results[ startIndex - b ] )
                    {
                        foundAFalse = true;
                    }
                }

                if ( !foundAFalse )
                {
                    foundRunOfSix = true;
                    lastIndexOfSix = startIndex - 5;
                }
            }

            int answer = 0;

            bool solved = false;

            // find the first false starting from the end of the run of true values
            for (int index = lastIndexOfSix; !solved && index > 0 ; index--)
            {
                if (!results[index])
                {
                    solved = true;
                    answer = index;
                }
            }

            if (solved)
            {
                Console.WriteLine("Answer found. The highest number is " + answer);
            }
            else
            {
                Console.WriteLine("Not found, try again!");
            }

            Console.ReadKey();
        }
    }
}
