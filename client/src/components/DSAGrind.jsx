import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const javaSnippet = `// Next Greater Element (Monotonic Stack)
class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        
        for (int i = 2 * n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= nums[i % n]) {
                stack.pop();
            }
            if (i < n) {
                result[i] = stack.isEmpty() ? -1 : stack.peek();
            }
            stack.push(nums[i % n]);
        }
        return result;
    }
}`;

export default function DSAGrind() {
  return (
    <section id="practice" className="py-20 border-t border-[#1a1d24] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-[#f59e0b] block mb-2 uppercase tracking-wider">
            Problem Solving
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f3f4f6]">
            DSA Practice in Java
          </h2>
          <p className="text-[#9ca3af] text-base mt-2 max-w-2xl">
            I regularly solve problems on Striver's A2Z sheet to keep my algorithms, time/space complexity analysis, and problem-solving fundamentals sharp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Topics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-[#111317] border border-[#20242c]">
              <h3 className="text-base font-semibold text-[#f3f4f6] mb-2">
                Curriculum &amp; Topics
              </h3>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                Main focus areas include arrays, two pointers, sliding window, trees, dynamic programming, and graphs.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[#161920] border border-[#232833] text-[#d1d5db]">
                  Java
                </span>
                <span className="px-2.5 py-1 rounded bg-[#161920] border border-[#232833] text-[#d1d5db]">
                  Striver A2Z Sheet
                </span>
                <span className="px-2.5 py-1 rounded bg-[#161920] border border-[#232833] text-[#d1d5db]">
                  LeetCode
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1115] border border-[#1b1e26] text-xs text-[#9ca3af]">
              <span className="text-[#ededed] font-medium block mb-1">BaseCase Platform</span>
              <span>This practice directly inspired my algorithmic platform, BaseCase, which I built to track problem revision and execution.</span>
              <div className="mt-3">
                <a
                  href="https://tuf-tracker2.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#f59e0b] hover:text-[#fbbf24] font-mono text-xs"
                >
                  <span>Open BaseCase</span>
                  <FiArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Code block */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-[#0f1115] border border-[#20242c] overflow-hidden">
              <div className="px-4 py-2.5 bg-[#13161c] border-b border-[#1f232c] flex items-center justify-between text-xs font-mono text-[#71717a]">
                <span>Solution.java</span>
                <span className="text-[#9ca3af]">Monotonic Stack</span>
              </div>

              <pre className="p-5 text-xs sm:text-sm font-mono text-[#cbd5e1] overflow-x-auto leading-relaxed">
                <code>{javaSnippet}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
