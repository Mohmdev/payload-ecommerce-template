import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cn } from '@/lib/utilities/cn'
import React, { Suspense } from 'react'

import { FilterList } from './filter'

async function CategoryList() {
  const payload = await getPayload({ config: configPromise })

  const categories = (
    await payload.find({
      collection: 'categories',
      sort: 'title'
    })
  ).docs?.map((category) => {
    return {
      // @ts-expect-error
      path: `/search/${category.slug}`,
      title: category.title
    }
  })

  return <FilterList list={categories} title="Categories" />
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300'
const items = 'bg-neutral-400 dark:bg-neutral-700'

export function Categories() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={cn(skeleton, activeAndTitles)} />
          <div className={cn(skeleton, activeAndTitles)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}
