//
//  ShareViewController.swift
//  sharePlaylist
//
//  Created by Simon Boudrias on 7/21/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import UIKit
import Social
import MobileCoreServices

class ShareViewController: SLComposeServiceViewController {

  override func isContentValid() -> Bool {
    // Do validation of contentText and/or NSExtensionContext attachments here
    return true
  }

  override func didSelectPost() {
    // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.

    // Inform the host that we're done, so it un-blocks its UI. Note: Alternatively you could call super's -didSelectPost, which will similarly complete the extension context.
    self.extensionContext!.completeRequestReturningItems([], completionHandler: nil)
  }

  override func configurationItems() -> [AnyObject]! {
    // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
    return []
  }
  
  override func viewDidLoad() {
    let extensionItem = extensionContext?.inputItems.first as! NSExtensionItem
    let itemProvider = extensionItem.attachments?.first as! NSItemProvider
    
    let propertyList = String(kUTTypePropertyList)
    if itemProvider.hasItemConformingToTypeIdentifier(propertyList) {
      itemProvider.loadItemForTypeIdentifier(propertyList, options: nil, completionHandler: { (item, error) -> Void in
        let dictionary = item as! NSDictionary
        NSOperationQueue.mainQueue().addOperationWithBlock {
          let results = dictionary[NSExtensionJavaScriptPreprocessingResultsKey] as! NSDictionary
          let url = NSURL(string: (results["currentURL"] as! String))
          //now you can do what you like with this url
        }
      })
    } else {
      print("error")
    }
  }
}

